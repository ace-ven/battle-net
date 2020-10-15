import { v4 as uuidv4 } from "uuid";

class Node {
  id: string;
  data: string;
  name: string;
  type: string;
  lang: string;
  children: Array<any>;
  constructor(
    id: string,
    name: string = "",
    data = "",
    type = "file",
    lang = "js"
  ) {
    this.id = id || uuidv4();
    this.data = data;
    this.name = name;
    this.type = type;
    this.lang = lang;
    this.children = [];
  }
  add(id: string, name: string, data: string, type: string) {
    this.children.push(new Node(id, name, data, type));
  }
  remove(id: string) {
    this.children = this.children.filter((e) => e.id !== id);
  }
}

class Tree {
  root: any;
  constructor(data: string) {
    this.root = new Node(uuidv4(), "My Project", "", "folder", "js");
  }
  traverseBF() {
    const arr = [this.root];
    while (arr.length) {
      const node: any = arr.shift();
      arr.push(...node.children);
    }
  }

  traverseDF() {
    const arr = [this.root];
    while (arr.length) {
      const node: any = arr.shift();
      if (node) {
        arr.unshift(...node.children);
      }
    }
  }

  renderTree() {
    const arr = [this.root];
    while (arr.length) {
      const node: any = arr.shift();
      arr.push(...node.children);
    }
  }

  renderMapObj() {
    return JSON.parse(JSON.stringify(this.root));
  }

  addingNodeById(
    id: string,
    newId: string,
    name: string,
    data: string,
    type: string
  ) {
    const arr = [this.root];
    let found = false;
    if (!id) {
      const node: any = arr.shift();
      node.add(newId || "82398123" + Math.random(), name, data, type);
    }
    while (arr.length || found) {
      const node: any = arr.shift();
      if (id && node.id == id) {
        found = true;
        node.add(newId || "82398123" + Math.random(), name, data, type);
        return;
      } else {
        arr.push(...node.children);
      }
    }
  }
}

export { Tree, Node };
