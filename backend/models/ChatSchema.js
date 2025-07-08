const ChatSchema = new mongoose.Schema({
  user: String,
  messages: [{ role: String, content: String }],
});
