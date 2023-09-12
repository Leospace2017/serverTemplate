import z from "zod";


export const validateInput = (zodSchema, body) => {
    let error = {};
      const result = zodSchema.safeParse(body);
  
      if (!result.success) {
        result.error.issues.forEach(
          (issue) => (error = { ...error, [issue.path[0]]: issue.message })
        );
        const message =
          Object.keys(error).length > 0
            ? { errors: error }
            : { success: true };
  
            return res.status(409).json({ message: message });
      }
      
}