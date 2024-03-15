class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (
      lowercase.includes("hello") ||
      lowercase.includes("hi") ||
      lowercase.includes("morning") ||
      lowercase.includes("afternoon") ||
      lowercase.includes("evening")
    ) {
      this.actionProvider.greet();
    } else if (
      lowercase.includes("computer") ||
      lowercase.includes("computers")
    ) {
      this.actionProvider.handleComputer();
    } else if (lowercase.includes("phone") || lowercase.includes("phones")) {
      this.actionProvider.handlePhones();
    } else if (
      lowercase.includes("computer") ||
      lowercase.includes("computer")
    ) {
      this.actionProvider.handleComputer();
    } else if (
      lowercase.includes("other") ||
      lowercase.includes("others") ||
      lowercase.includes("gadget") ||
      lowercase.includes("gadgets")
    ) {
      this.actionProvider.handleGadget();
    } else if (lowercase.includes("how are you")) {
      this.actionProvider.fine();
    } else if (
      lowercase.includes("price") ||
      lowercase.includes("how much") ||
      lowercase.includes("prices")
    ) {
      this.actionProvider.handlePrice();
    } else if (
      lowercase.includes("findi") ||
      lowercase.includes("sell") ||
      lowercase.includes("company") ||
      lowercase.includes("about") ||
      lowercase.includes("product") ||
      lowercase.includes("products")
    ) {
      this.actionProvider.handleAbout();
    } else if (
      lowercase.includes("delivery") ||
      lowercase.includes("deliver") ||
      lowercase.includes("how long") ||
      lowercase.includes("how much time")
    ) {
      this.actionProvider.handleDelivery();
    } else if (
      lowercase.includes("your name") ||
      lowercase.includes("who") ||
      lowercase.includes("what is this")
    ) {
      this.actionProvider.myName();
    } else if (lowercase.includes("findai")) {
      this.actionProvider.handleWhoIsFindAI();
    } else if (lowercase.includes("help") || lowercase.includes("problem")) {
      this.actionProvider.handleHelp();
    } else if (lowercase.trim().length === 0) {
      this.actionProvider.handleBlank();
    } else {
      this.actionProvider.handleNotAble();
    }
  }
}

export default MessageParser;
