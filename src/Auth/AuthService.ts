import { Request, Response, NextFunction } from "express";
import { registerValidation, loginValidation, resetPasswordValidation } from "./AuthValidator";
//import { sendVerificationEmail, sendPasswordResetEmail } from "./EmailService";
import JwtService from "../common/JtwtService";
import { ServiceProviderDoc, ServiceProvider } from "../ServiceProvider/ServiceProviderModel";
import bcrypt from "bcrypt";

class AuthService {
  public async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Implement signup logic
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await ServiceProvider.findOne({ email });
      if (existingUser) {
        res.status(409).json({
          status: false,
          message: "User already exists",
        });
        return;
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Validate user input
      registerValidation(req, res, async () => {
        // Save the user to the database
        const createdUser = await ServiceProvider.create({
          name,
          email,
          hashedPassword
        });
  
        res.status(201).json({
          status: true,
          message: "Successfully signed up. Please check your email for verification.",
          user: createdUser,
        });
      });
    } catch (err) {
      next(err);
    }
  }
  
public login(req: Request, res: Response, next: NextFunction): void {
  try {
    // Implement login logic
    const { email, password } = req.body;

    // Validate user input
    loginValidation(req, res, async () => {
      // Authenticate user
      const user = await ServiceProvider.findOne({ email });
      if (!user) {
        // Handle invalid user case
        res.status(401).json({
          status: false,
          message: 'Invalid credentials',
        });
        return;
      }

      // Check password validity
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // Handle invalid password case
        res.status(401).json({
          status: false,
          message: 'Invalid credentials',
        });
        return;
      }

      // Generate access token and refresh token
      const accessToken = JwtService.generateAccessToken(user);
      const refreshToken = JwtService.generateRefreshToken(user);

      res.json({
        status: true,
        message: 'Successfully logged in.',
        accessToken,
        refreshToken,
      });
    });
  } catch (err) {
    next(err);
  }
}


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
