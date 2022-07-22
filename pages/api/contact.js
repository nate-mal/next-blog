import excuteQuery from "../../lib/db";
import prisma from "../../lib/prisma";
export const storeMessage = async ({ name, email, message }) => {
  return excuteQuery({
    query: `INSERT INTO messages(name,email,message) VALUES('${name}','${email}','${message}');`,
  });
};

async function handler(req, res) {
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
    // storeMessage(NewMessage);
    try {
      const user = await prisma.messages.create({
        data: NewMessage,
      });
      console.log(user);
      res.status(201).json({
        message: "Succesfully stored the message!",
        inserterdMessage: NewMessage,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Something went wrong when attempting to connect the database!",
        error: error,
      });
    }
  }
}

export default handler;
