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
    const user = await prisma.messages.create({
      data: NewMessage,
    });
    console.log(user);
    res
      .status(201)
      .json({ message: "Succesfully stored message!", message: NewMessage });
  }
}

export default handler;
