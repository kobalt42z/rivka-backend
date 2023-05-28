import * as admin from 'firebase-admin'
//!!!!! DANGER
export const MakeFirstAdmin = async (uid:string) => {
    const resp = await admin.auth().setCustomUserClaims(uid, { admin: true });
    const user = await admin.auth().getUser(uid)
    console.log(user.customClaims);
}
