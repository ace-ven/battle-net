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
    type = "folder",
    lang = ""
  ) {
    this.id = id || uuidv4();
    this.data = data;
    this.name = name;
    this.type = type;
    this.lang = lang;
    this.children = [];
  }
  add(id: string, name: string, data: string, type: string, lang: string) {
    this.children.push(
      new Node(
        id,
        `${name}${type !== "folder" ? `.${lang}` : ""}`,
        data,
        type,
        lang
      )
    );
  }
  remove(id: string) {
    console.log("this", this);
    console.log("sfsdfd", id);
    this.children = this.children.filter((e) => e.id !== id);
  }
}

class Tree {
  root: any;
  constructor(data: string) {
    this.root = new Node(uuidv4(), "My Project", "", "folder");
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
    type: string,
    lang: string
  ) {
    const arr = [this.root];
    let found = false;
    if (!id) {
      const node: any = arr.shift();
      node.add(newId || "82398123" + Math.random(), name, data, type, lang);
    }
    while (arr.length || found) {
      const node: any = arr.shift();
      if (id && node.id === id) {
        found = true;
        node.add(newId || "82398123" + Math.random(), name, data, type, lang);
        return;
      } else {
        arr.push(...node.children);
      }
    }
  }

  updateNodeName(id: string, name: string, lang: string) {
    const arr = [this.root];
    let found = false;

    while (arr.length || found) {
      const node: any = arr.shift();
      if (id && node.id === id) {
        found = true;
        node.name = name;
        node.lang = lang;
        return;
      } else {
        arr.push(...node.children);
      }
    }
  }

  updateNodeContent(id: string, data: string) {
    const arr = [this.root];
    let found = false;

    while (arr.length || found) {
      const node: any = arr.shift();
      if (id && node.id === id) {
        found = true;
        node.data = data;
        return node;
      } else {
        arr.push(...node.children);
      }
    }
  }

  getNodeById(id: string) {
    const arr = [this.root];
    let found = false;

    while (arr.length || found) {
      const node: any = arr.shift();
      if (id && node.id === id) {
        found = true;
        return node;
      } else {
        arr.push(...node.children);
      }
    }
  }
  deleteNodeById(id: string) {
    const arr = [this.root];
    let found = false;
    let parent = undefined;
    while (arr.length || found) {
      const node: any = arr.shift();
      if (id && node && node.id === id) {
        console.log(parent);
        parent.remove(id);
        found = true;
        return;
      } else {
        node && arr.push(...node.children);
        parent = node;
      }
    }
  }
}

export { Tree, Node };
