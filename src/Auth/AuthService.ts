import { Request, Response, NextFunction } from "express";
import { registerValidation, /*loginValidation, resetPasswordValidation*/ } from "./AuthValidator";
import { ServiceProvider } from "src/Service/ServiceModel";
//import { sendVerificationEmail, sendPasswordResetEmail } from "./EmailService";
//import { generateAccessToken, generateRefreshToken, verifyToken } from "./JwtService";
import { ServiceProviderDoc } from "src/ServiceProvider/ServiceProviderModel";

class AuthService {
  public signup(req: Request, res: Response, next: NextFunction): void {
    try {
      // Implement signup logic
      const user: ServiceProviderDoc = req.body;
      
      // Validate user input
      registerValidation(req, res, () => {
        // Process signup logic here
        // Send verification email
        //sendVerificationEmail(user.email);
        
        res.status(201).json({
          status: true,
          message: "Successfully signed up. Please check your email for verification.",
        });
      });
    } catch (err) {
      next(err);
    }
  }

//   public login(req: Request, res: Response, next: NextFunction): void {
//     try {
//       // Implement login logic
//       const { email, password } = req.body;

//       // Validate user input
//       loginValidation(req, res, () => {
//         // Authenticate user
//         // Generate access token and refresh token
//         const accessToken = generateAccessToken(user);
//         const refreshToken = generateRefreshToken(user);
        
//         res.json({
//           status: true,
//           message: "Successfully logged in.",
//           accessToken,
//           refreshToken,
//         });
//       });
//     } catch (err) {
//       next(err);
//     }
//   }

//   public resetPassword(req: Request, res: Response, next: NextFunction): void {
//     try {
//       // Implement reset password logic
//       const { email } = req.body;

//       // Validate user input
//       resetPasswordValidation(req, res, () => {
//         // Generate password reset token
//         const resetToken = generateResetToken(email);
        
//         // Send password reset email
//         sendPasswordResetEmail(email, resetToken);

//         res.json({
//           status: true,
//           message: "Password reset instructions have been sent to your email.",
//         });
//       });
//     } catch (err) {
//       next(err);
//     }
//   }

  // Other methods and functionalities of AuthService

}

export default new AuthService();
