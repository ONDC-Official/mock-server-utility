const express = require("express");
const log = require("./utils/logger");
const app = express();
const config = require("./utils/config.js");
const router = require("./routes/route");

const $RefParser = require("json-schema-ref-parser");
const fs = require("fs");
const Handlebars = require("handlebars");
const yaml = require("js-yaml");
const { Collection, Item, Header } = require("postman-collection");
const baseTemplate = "./yaml-templates/baseTemplate.yaml";
const buildYamlFile = "./build/build.yaml";
const baseDefault = "./yaml-templates/baseDefault.yaml";
const exampleConfig = "./yaml-templates/exampleConfig.yaml";
const {
  SUB_INSTRUCTION_FOLDERS,
  template_paths,
  allowedAttributes,
} = require("./utils/constants");


const args = process.argv.slice(2);
var configFile = args[0];
if (!configFile || configFile == "") {
  configFile = "./config.yaml";
}

async function baseYMLFile(file) {
  try {
    const schema = await $RefParser.dereference(file);
    return schema;
  } catch (error) {
    console.error("Error parsing schema:", error);
  }
}
//read the build.yaml file
createInstructionSet(buildYamlFile);

async function generateYaml(path, data, isJSON) {
  if (typeof data === "string" || isJSON) {
    if (isJSON) {
      data = JSON.stringify(data);
    }
    return fs.writeFileSync(path, data);
  }
  fs.writeFileSync(path, yaml.dump(data));
}

async function addHandleBars(path, examples) {
  for (let paths of Object.keys(examples)) {
    //create dynamic template for context for now
    if (paths === "context") {
      for (let attribs of Object.keys(examples[paths])) {
        if (allowedAttributes.hasOwnProperty(attribs)) {
          examples[paths][attribs] = `{{${allowedAttributes[attribs]}}}`;
        }
      }
    }
  }
  generateYaml(path, examples);
}

async function traverseExamples(
  exampleSet,
  folderRef,
  templateFile,
  generateCollection
) {
  let paths = {};
  let postmanCollection = new Collection({
    info: {
      name: "Mock Server API",
    },
    item: [],
  });
  for (const example of Object.keys(exampleSet)) {
    const { examples } = exampleSet[example];
    const path = `${folderRef}/${example}.yaml`;
    //creating paths for on-demand.yaml here
    if (templateFile) {
      let pathObject = { [example]: "" };

      const baseObject = {
        schema: {
          $ref: `${folderPath.substring()}/schema/${example}.yaml`,
          //$ref: `${__dirname}/${folderPath.substring()}/schema/${example}.yaml`,
        },
        callbacks: {
          //$ref: `${__dirname}/${folderPath.substring()}/${example}.yaml`,
          $ref: `${folderPath.substring()}/${example}.yaml`,
        },
      };
      pathObject[example] = baseObject;
      paths = { ...paths, ...pathObject };
    } else {
      //read payloads & create postman collection
      if (generateCollection) {
        buildCollectionItems = await createCollectionItem(
          example,
          examples[0]?.value
        );
        postmanCollection.items.add(postmanRequest);
      }

      addHandleBars(path, examples[0]?.value);
      //generateYaml(path, examples[0]?.value);
    }
  }
  if (postmanCollection && generateCollection) {
    generatePostmanCollecion(postmanCollection, generateCollection);
  }

  //creating on-demand.yaml here
  if (Object.keys(paths)?.length) {
    let readConfigTemplate = fs.readFileSync(templateFile, "utf-8");
    let template = Handlebars.compile(readConfigTemplate);
    const result = template({ type: "BAP/BPP" });
    readConfigTemplate = yaml.load(result);
    readConfigTemplate.path = paths;
    generateYaml(folderRef, readConfigTemplate);
  }
}
async function traverseSchema(exampleSet, folderRef, type, templateSchema) {
  for (const schema of Object.keys(exampleSet)) {
    let schemas =
      exampleSet[schema]["post"]["requestBody"]["content"]["application/json"][
        "schema"
      ];
    const path = `${folderRef}/${schema}`;
    if (type) {
      const readTemplateFile = fs.readFileSync(templateSchema, "utf-8");
      let template = Handlebars.compile(readTemplateFile);
      let data = {};
      const removeExtraChar = schema.substring(1);
      if (template_paths.hasOwnProperty(removeExtraChar)) {
        if (type === "default") {
          data.callback = `${template_paths[removeExtraChar]}`;
          data.payload = template_paths[removeExtraChar]
            ? `./template/${template_paths[removeExtraChar]}.yaml`
            : "";
        } else {
          data.ref = `../payloads/${removeExtraChar}.yaml`;
        }
        schemas = template(data);
        generateYaml(`${path}.yaml`, schemas);
      }
    } else {
      generateYaml(`${path}.yaml`, schemas);
    }
  }
}
async function createCollectionItem(requestName, requestPayload) {
  return (postmanRequest = new Item({
    name: `${requestName}`,
    request: {
      header: createRequestHeader(),
      url: `http://localhost:5500/${requestName}`,
      method: "POST",
      body: {
        mode: "raw",
        raw: JSON.stringify(requestPayload),
      },
      auth: null,
    },
  }));
}

function createRequestHeader() {
  // This string will be parsed to create header
  const rawHeaderString =
    "Authorization:\nContent-Type:application/json\ncache-control:no-cache\n";
  // Parsing string to postman compatible format
  const rawHeaders = Header.parse(rawHeaderString);
  // Generate headers
  return rawHeaders.map((h) => new Header(h));
}

async function generatePostmanCollecion(postmanCollection, generateCollection) {
  const collectionJSON = postmanCollection.toJSON();
  try {
    fs.writeFileSync(
      `${generateCollection}_collection.json`,
      JSON.stringify(collectionJSON)
    );
  } catch (error) {
    console.log("Error creating postman collection", error);
  }
}

var folderPath;
async function createInstructionSet(file) {
  try {
    const buildFile = await baseYMLFile(file);
    const examples = buildFile["x-examples"];
    const paths = buildFile["paths"];
    //check entered build.yaml has on-demand exist or not
    for (const instuctionSet of Object.keys(examples)) {
      const { example_set: exampleSet } = examples[instuctionSet];
      folderPath = `./${instuctionSet}`;
      //remove previous directory on every run
      fs.rmSync(folderPath, { recursive: true, force: true });
      fs.mkdirSync(folderPath, {
        recursive: true,
      });
      for (let path = 0; path < 6; path++) {
        if (path < 4) {
          fs.mkdirSync(`${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`);
        }

        if (path === 0) {
          //payloads
          const generateCollection = instuctionSet;
          await traverseExamples(
            exampleSet,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`,
            null,
            generateCollection
          );
        } else if (path === 1) {
          //operations
          const baseOperations = "./yaml-templates/baseOperations.yaml";
          const readOperationsTemplate = fs.readFileSync(
            baseOperations,
            "utf-8"
          );
          generateYaml(
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}/req_body.yaml`,
            readOperationsTemplate
          );
        } else if (path === 2) {
          //template
          await traverseSchema(
            paths,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`,
            "template",
            baseTemplate
          );
        } else if (path === 3) {
          //schema
          await traverseSchema(
            paths,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`
          );
        } else if (path === 4) {
          //config file
          await traverseExamples(
            exampleSet,
            `${folderPath}/${instuctionSet}.yaml`,
            exampleConfig
          );
        } else {
          //create files at on-demand root
          await traverseSchema(paths, `${folderPath}`, "default", baseDefault);
        }
      }
      if (configFile === instuctionSet) {
        const file = `${folderPath}/${configFile}.yaml`;
        startUp(file);
      }
    }
  } catch (error) {
    console.log("Error in createInstructionSet()", error);
  }
}

//After instuctionSet completion, read response here
async function startUp(file) {
  await config.loadConfig(file);
  const server = config.getServer();
  app.use(express.json());
  const logger = log.init();
  app.listen(server.port, () => {
    logger.info(`This app is running on port number : ${server.port}`);
  });
  app.use(router);
}

// startUp();
