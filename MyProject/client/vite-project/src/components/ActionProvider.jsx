class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage(
      "Hello friend,I am FindAI,how can I help you?"
    );
    this.addMessageToState(message);
  };

  myName = () => {
    const message = this.createChatBotMessage(
      "My name is FindAI,nice to meet you dear!"
    );
    this.addMessageToState(message);
  };

  fine = () => {
    const message = this.createChatBotMessage(
      "I am fine!Thank you for asking me!"
    );
    this.addMessageToState(message);
  };

  handlePhones = () => {
    const message = this.createChatBotMessage(
      `Experience the future of technology from varieties of brands, with our cutting-edge smartphone. Sleek design, powerful performance, and stunning camera capabilities – all in one device. 
        Upgrade your mobile experience today!`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleComputer = () => {
    const message = this.createChatBotMessage(
      `Discover the ultimate computing experience with our cutting-edge computer product, designed to elevate your productivity and gaming to new heights. Unleash the power of innovation and take your digital world to the next level - 
        Order yours today and revolutionize the way you work and play!`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleGadget = () => {
    const message = this.createChatBotMessage(
      `Introducing our cutting-edge electronic gadget, designed to revolutionize your daily life. Elevate your tech game with sleek design and unparalleled functionality –
         order now and experience the future today.`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleAbout = () => {
    const message = this.createChatBotMessage(
      `FindI is a well known world wide company for selling electronic devices such as phones,computers and many others.
        Our team welcome you~.`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handlePrice = () => {
    const message = this.createChatBotMessage(
      `Our products are very affordable with special promotions~To get more details,please browse our site~`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleDelivery = () => {
    const message = this.createChatBotMessage(
      `Experience the convenience of lightning-fast delivery,between 3 to 7 days with our e-commerce store. 
        Shop now and get your favorite products delivered right to your doorstep, ensuring a seamless and hassle-free shopping experience.`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleHelp = () => {
    const message = this.createChatBotMessage(
      `For any other help or query,please contact by email testabc@gmail.com or phone 07501234567`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleBlank = () => {
    const message = this.createChatBotMessage(
      `Sorry dear!I don't get you.`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  handleWhoIsFindAI = () => {
    const message = this.createChatBotMessage(
      `FindAI is my name~An AI chatbot developed by Sahy Liana~`
    );

    this.addMessageToState(message);
  };

  handleNotAble = () => {
    const message = this.createChatBotMessage(
      `Sorry, I do not have enough information to answer this query... Please contact us by email testabc@gmail.com or phone 07501234567`
      //   {
      //     widget: "javascriptQuiz",
      //   }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
