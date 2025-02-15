import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "kite.noreply@mail.ru",
        pass: "twCdYJiH4dHCPpEhKyHp"
    }
});

async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "nodejs", // sender address
        to: "asterionblaze@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
