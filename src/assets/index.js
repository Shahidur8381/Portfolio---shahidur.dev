import logoImg from "./logo.svg";
import backendImg from "./backend.png";
import creatorImg from "./creator.png";
import mobileImg from "./mobile.png";
import webImg from "./web.png";
import githubImg from "./github.png";
import menuImg from "./menu.svg";
import closeImg from "./close.svg";

import cssImg from "./tech/css.png";
import dockerImg from "./tech/docker.png";
import figmaImg from "./tech/figma.png";
import gitImg from "./tech/git.png";
import htmlImg from "./tech/html.png";
import javascriptImg from "./tech/javascript.png";
import mongodbImg from "./tech/mongodb.png";
import nodejsImg from "./tech/nodejs.png";
import reactjsImg from "./tech/reactjs.png";
import reduxImg from "./tech/redux.png";
import tailwindImg from "./tech/tailwind.png";
import typescriptImg from "./tech/typescript.png";
import threejsImg from "./tech/threejs.svg";

import metaImg from "./company/meta.png";
import shopifyImg from "./company/shopify.png";
import starbucksImg from "./company/starbucks.png";
import teslaImg from "./company/tesla.png";

import carrentImg from "./carrent.png";
import jobitImg from "./jobit.png";
import tripguideImg from "./tripguide.png";

const getSrc = (img) => (img && img.src ? img.src : img);

export const logo = getSrc(logoImg);
export const backend = getSrc(backendImg);
export const creator = getSrc(creatorImg);
export const mobile = getSrc(mobileImg);
export const web = getSrc(webImg);
export const github = getSrc(githubImg);
export const menu = getSrc(menuImg);
export const close = getSrc(closeImg);

export const css = getSrc(cssImg);
export const docker = getSrc(dockerImg);
export const figma = getSrc(figmaImg);
export const git = getSrc(gitImg);
export const html = getSrc(htmlImg);
export const javascript = getSrc(javascriptImg);
export const mongodb = getSrc(mongodbImg);
export const nodejs = getSrc(nodejsImg);
export const reactjs = getSrc(reactjsImg);
export const redux = getSrc(reduxImg);
export const tailwind = getSrc(tailwindImg);
export const typescript = getSrc(typescriptImg);
export const threejs = getSrc(threejsImg);

export const meta = getSrc(metaImg);
export const shopify = getSrc(shopifyImg);
export const starbucks = getSrc(starbucksImg);
export const tesla = getSrc(teslaImg);

export const carrent = getSrc(carrentImg);
export const jobit = getSrc(jobitImg);
export const tripguide = getSrc(tripguideImg);
