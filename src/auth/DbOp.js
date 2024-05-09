import db from "../Db/Db";

import { set, ref } from "firebase/database";
// import authContext from "../Context/Authentication/AuthContext";
// import { useContext } from "react";

const saveIntoDb = (e, username) => {
    console.log(e);
    set(ref(db, "Users/" + e.uid), {
        Username: username,
    });
};

export { saveIntoDb };
