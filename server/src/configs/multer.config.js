import multer from "multer";

const storageEngine = multer.memoryStorage();

const parser = multer({
  storage: storageEngine,
  limits: { fileSize: 5 * 1024 * 1024 } // 5mb

});

export default parser;
