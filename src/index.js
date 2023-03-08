import app from "./app"
const port = process.env.PORT || 3001;
require('./db/mongoose')

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
