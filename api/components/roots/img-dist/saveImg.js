export {db} from "./../config/dbConnection.js"
function sameImg(img) {
    const cmd = "INSERT INTO img(content) VALUES(?)"
    db.query(cmd,[img],(err) => {
        if(err) console.error(err);

    })
}
