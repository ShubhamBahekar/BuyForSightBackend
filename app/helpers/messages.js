const MESSAGES = {

errorTypes :{
  INTERNAL_SERVER_ERROR : "Internal Server Error"
},

apiErrorStrings :{
SERVER_ERROR :"Oops! something went wrong", 
DATA_NOT_EXISTS : (data) =>`${data} does not exists`,
DATA_ALREADY_EXISTS: (data) =>`${data} already exists`,
DATA_IS_INVALID : (data) => `${data} is invalid`,
DATA_IS_EXPIRED : (data) => `${data} is expired`,
UNAUTHORIZED : (data) => `${data} is unauthorized`,
FORBIDDEN : (data) => `${data} is FORBIDDEN`,
EXPIRED : (data) =>`${data} is expired. Please login again`
},

apiSuccessStrings :{
    CREATE: (value) => `${value} created successfully`,
    UPDATE: (value) => `${value} updated successfully`,
    DELETE: (value) => `${value} deleted successfully`,
}

}

module.exports = MESSAGES ;