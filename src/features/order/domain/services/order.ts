import { AppError, HttpCode } from "../../../../shared/error/app_error";

export const checkOrderAmount = (userAmount: number, amount: number): void => {
    if (userAmount < amount) {
        
        throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: "Transaction amount in greater than your balance...",
          });
      }
    
      if (amount < 50) {
        throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: "Transaction should be greater than 50...",
          });
      
      }
      if (amount > 20000) {
        throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: "Transaction should be smaller than 20,001...",
          });
      }
}