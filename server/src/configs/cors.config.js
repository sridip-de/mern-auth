const whitelist = ['http://localhost:4173', 'http://localhost:5173']

const CORS_CONFIG = {
  origin: function (origin, callback) {
    if(whitelist.indexOf(origin) !== -1 ) { // see docs bellow 
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  } ,
  credentials:true
}

export default CORS_CONFIG;

// (origin, callback)
// 1. origin --> the url from where request is coming
// 2. callback --> tells the CORS middleware whether to allow or block the request

// indexOf(origin) This logic returns 0 or higher value if the origin url (sent by the browser in the req.header('origin')) is matched or contains
// if the url does not matched with the array values then it returns -1 
// 
// callback(null, ture)  
// 1. null --> no error
// 2. true --> allow this origin