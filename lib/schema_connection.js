const schemaSessionDescription = () => ({
  description: "WebRTC Session Description",
  type: "object",
  properties: {
    type: { type: "string", description: "Session Description Type" },
    sdp: { type: "string", description: "Session Description Protocol payload" }    
  }
});

const schemaConnection = () => ({
  description: "A connection", 
  type: "object",
  properties: {
    id: { type: "string" },
    localDescription: schemaSessionDescription(),
    remoteDescription: schemaSessionDescription(),
  } 
});

const API_SCHEMA = {
  'POST/connections': {
    description: "Create a new connection",
    response: {
      200: schemaConnection(),
    }
  },
  'GET/connections': {
    description: "Get a list of connections",
    response: {
      200: {
        description: "On success returns an array of connections",
        type: "array",
        items: schemaConnection()
      }
    }
  },
  'DELETE/connections/:id': {
    description: "Remove a connection",
    params: {
      id: { type: "string", description: "Connection ID" }
    }
  },
  'POST/connections/:id/remote-description': {
    description: "Update session description by Remote Peer",
    params: {
      id: { type: "string", description: "Connection ID" }
    },
    response: {
      200: schemaSessionDescription()
    }
  },
  'GET/connections/:id/local-description': {
    description: "Session Description for Local Peer",
    params: {
      id: { type: "string", description: "Connection ID" }
    },
    response: {
      200: schemaSessionDescription()
    }
  }
};    
      
const schemas = (method, path) => {
  return API_SCHEMA[method + path] ? { schema: API_SCHEMA[method + path] } : {};
}   
  
module.exports = schemas;
