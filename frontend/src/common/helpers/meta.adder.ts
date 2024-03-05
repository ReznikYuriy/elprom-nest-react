export const metaAdder = (queryProperty: string, value: string) => {
  // Get an element if it exists already
  const element: Element | null = document.querySelector(
    `meta[${queryProperty}]`
  );

  // Check if the element exists
  if (element) {
    // If it does just change the content of the element
    element.setAttribute("content", value);
  } else {
    // It doesn't exist so lets make a HTML element string with the info we want
    const new_element:string = `<meta ${queryProperty} content="${value}" />`;

    // And insert it into the head
    document.head.insertAdjacentHTML("beforeend", new_element);
  }
};
