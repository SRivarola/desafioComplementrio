import transporter from "../config/transporter.js";
import { generateUniqueToken } from "../utilsFunctions.js";
import AuthRepository from "../repositories/users.rep.js";
import env from "../config/env.js";

const { G_MAIL, BASE_URL} = env;

const authRepository = new AuthRepository();

export default async function (req, res, next) {
    try {
        const token = generateUniqueToken();
        const expiresIn = new Date();
        expiresIn.setHours(expiresIn.getHours() + 1);

        await authRepository.saveResetToken(user_id, token, expiresIn);

        const resetUrl = `${BASE_URL}/auth/forgot-password?user_id=${user_id}&token=${token}`;
        const subject = "Restablecimiento de contraseña";
        const html = `
        <h1>Restablecimiento de contraseña</h1>
        <p>Haz click en el siguiente enlace para restablecer tu contraseña: </p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Este enlace expirará en 1 hora.</p>
        `;

        await transporter.sendMail({
            from: G_MAIL,
            to: email,
            subject,
            html
        });
        return token;
    } catch(error) {
        throw error;
    }
}
