const SUB_INSTRUCTION_FOLDERS = [
    "payloads",
    "operations",
    "template",
    "schema",
    "config",
  ];
  const template_paths = {
    search: "on_search",
    select: "on_select",
    confirm: "on_confirm",
    init: "on_init",
    rating: "on_rating",
    status: "on_status",
    support: "on_support",
    track: "on_track",
    on_search: "select",
    on_init: "confirm",
    on_select: "init",
    update: "on_update",
    cancel: "on_cancel",
    //not decided
    on_confirm: "",
    on_track: "",
    on_cancel: "",
    on_update: "",
    on_status: "",
    on_rating: "",
    on_support: "",
  };
  
  const allowedAttributes = {
    bap_uri: "bap_uri",
    bpp_uri: "bpp_uri",
    city: "city_code",
    message_id: "msg_id",
    country: "country",
    domain: "domain",
    transaction_id: "transaction_id"
  };

  module.exports = {SUB_INSTRUCTION_FOLDERS, template_paths,allowedAttributes}
  