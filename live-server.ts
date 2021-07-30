import liveServer, { LiveServerParams } from 'live-server'
import path from "path";
import { RequestHandler } from "express";
import fs from "fs";

const root = path.resolve(__dirname, 'build', 'html')

const appendFiletype: RequestHandler = (req, _, next) => {
  if (!path.extname(req.url)) {
    if (!fs.existsSync(path.join(root, req.url))) {
      req.url = `${req.url}.html`
    }
  }

  return next()
}

const params: LiveServerParams = {
  port: 8080,
  root,
  logLevel: 2,
  middleware: [
    appendFiletype
  ]
};

liveServer.start(params);
