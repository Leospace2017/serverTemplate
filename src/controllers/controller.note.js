import { Note, noteFormSchema } from "../models/model.note.js";

export const createNote = async (req, res, next) => {
  let noteCreateError = {};


  try {
    const {noteContent} = req.body;

    const result = noteFormSchema.safeParse(req.body);

    if (!result.success) {
      result.error.issues.forEach(
        (issue) =>
          (noteCreateError = {
            ...noteCreateError,
            [issue.path[0]]: issue.message,
          })
      );
      const message =
        Object.keys(noteCreateError).length > 0
          ? { errors: noteCreateError }
          : { success: true };

      return res.status(409).json({ message: message });
    }

    const note = await Note.create({
        note: noteContent,
        user: "64ff5d978b1234ad27889652"
    })

    res.status(201).json({message: `success to create ${note}`})


  } catch (err) {
    console.log(err)
    res.status(500).json({message:err.message})
  }
};
