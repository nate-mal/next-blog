import excuteQuery from "../../lib/db";

export const storeMessage = async ({ name, email, message }) => {
  return excuteQuery({
    query: `INSERT INTO messages(name,email,message) VALUES('${name}','${email}','${message}');`,
  });
};

function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    //  Store it in a database

    const NewMessage = { email, name, message };
    // console.log(NewMessage);
    storeMessage(NewMessage);
    res
      .status(201)
      .json({ message: "Succesfully stored message!", message: NewMessage });
  }
}

export default handler;
