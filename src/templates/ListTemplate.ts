import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();
  ul: HTMLUListElement;
  private constructor(
  ) {
    this.ul = document.getElementById("listItems") as HTMLUListElement
  }


  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((ls) => {
      let lsItem:HTMLLIElement = document.createElement("li");
      lsItem.className = "item";

      const checkBoxInput: HTMLInputElement = document.createElement("input")
      checkBoxInput.id = ls.id;
      checkBoxInput.type = "checkbox";
      checkBoxInput.checked = ls.checked;
      checkBoxInput.tabIndex = 0;
      lsItem.append(checkBoxInput)

      checkBoxInput.addEventListener("change", () => {
        ls.checked = !ls.checked;
        fullList.save();
      })

      const inputLabel:HTMLLabelElement = document.createElement("label");
      inputLabel.htmlFor = ls.id;
      inputLabel.textContent = ls.item;
      lsItem.append(inputLabel);

      const btn: HTMLButtonElement = document.createElement("button");
      btn.className = "button";
      btn.textContent = "X";
      lsItem.append(btn);

      btn.addEventListener("click", () => {
        fullList.removeItem(ls.id);
        fullList.save();
        this.render(fullList);

      })

      console.log(lsItem)
      this.ul.append(lsItem);
    })
  }
}