require("dotenv").config()
const express = require("express");
const log = require("./utils/logger");
const app = express();
var https = require('https');
var http = require('http');
const path = require("path")
const cors = require("cors")
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
const matchText = 'form/' 
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
  try{
    if (typeof data === "string" || isJSON) {
      if (isJSON) {
        data = JSON.stringify(data);
      }
      return fs.writeFileSync(path, data);
    }
    fs.writeFileSync(path, yaml.dump(data));
  }catch(error){
    console.log('Error[generateYaml]', error)
  }
  
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
  for (let example of Object.keys(exampleSet)) {
    const { examples } = exampleSet[example];
    let path = `${folderRef}/${example}.yaml`;
    const isForm = example.match(matchText);
    //creating paths for on-demand.yaml here
    if (templateFile) {
      if(isForm){
        example = example.replace(/\//g, '_');
      }
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

      //for forms schema is not required in root config file.
      if(isForm){
        delete baseObject.schema
      }
        pathObject[example] = baseObject;
        paths = { ...paths, ...pathObject };
      
    } else {
      if(isForm){
        const replacedString = example.replace(/\//g, '_');
        path = `${folderRef}/${replacedString}.yaml`;
      }
      //read payloads & create postman collection
      if (generateCollection) {
        buildCollectionItems = await createCollectionItem(
          example,
          examples[0]?.value,
          method = example.match(matchText)? "GET": "POST"
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
async function traverseSchema(exampleSet, folderRef, type, templateSchema, formsData) {
    for (let schema of Object.keys(formsData)) {
      let schemas;
      schema = `/${schema}`
  
      const isFormFound = schema.match(matchText);
      if((type === "template" || !type) && isFormFound) {
        continue
      }
      if(!isFormFound){
        schemas =
        exampleSet[schema]["post"]["requestBody"]["content"]["application/json"][
          "schema"
        ];
      }
      let path;
      let removeExtraChar = schema.substring(1);
    if(isFormFound){
      //convert file name from form/personal-info to form_personal-info
      const replacedString = removeExtraChar.replace(/\//g, '_');
      path = `${folderRef}/${replacedString}`;
    }else{
      path = `${folderRef}/${schema}`;
    }
    
    if (type) {
      const readTemplateFile = fs.readFileSync(templateSchema, "utf-8");
      let template = Handlebars.compile(readTemplateFile);
      let data = {};
      if (template_paths.hasOwnProperty(removeExtraChar) || isFormFound) {
        if (type === "default") {
          data.callback = `${template_paths[removeExtraChar]}`;
          if(isFormFound){
            removeExtraChar = removeExtraChar.replace(/\//g, '_');
          }
          data.payload = isFormFound ? `./payloads/${removeExtraChar}.yaml`:
          template_paths[removeExtraChar]
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
async function createCollectionItem(requestName, requestPayload, method) {
  return (postmanRequest = new Item({
    name: `${requestName}`,
    request: {
      header: createRequestHeader(),
      url: `https://localhost:5500/${requestName}`,
      method: method,
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
      if (args[0]) {

      const path = args[0];
      const file = `./${path}/${path}.yaml`;

      startUp(file);
    }
    else{
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
          //template floder
          await traverseSchema(
            paths,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`,
            "template",
            baseTemplate,
            exampleSet
          );
        } else if (path === 3) {
          //schema folder
          await traverseSchema(
            paths,
            `${folderPath}/${SUB_INSTRUCTION_FOLDERS[path]}`,
            null,
            null,
            exampleSet
          );
        } else if (path === 4) {
          //config file
          await traverseExamples(
            exampleSet,
            `${folderPath}/${instuctionSet}.yaml`,
            exampleConfig
          );
        } else {
          //creating files at on-demand root with callback & payload
          await traverseSchema(paths, `${folderPath}`, "default", baseDefault, exampleSet);
        }
      }
      console.log("yaml generated from build.yaml")
      //un-comment if server has to run from same instruction set
      // if (configFile === instuctionSet) {
      //   const file = `${folderPath}/${configFile}.yaml`;
      //   startUp(file);
      // }
      
    }
  }
  } catch (error) {
    console.log("Error in createInstructionSet()", error);
  }
}

app.use(express.static(path.join(__dirname, 'public')));


//After instuctionSet completion, read response here
async function startUp(file) {
  await config.loadConfig(file);
  const server = config.getServer();
  app.use(express.json({ limit: '20mb' }));

  const logger = log.init();

  app.listen(server.port, () => {
    logger.info(`This app is running on port number : ${server.port}`);
  });
  app.use(cors())
  app.use(router);
}

// startUp();
