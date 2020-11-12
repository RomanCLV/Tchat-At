export default function createHandlers(app, socket) {

    const newMessage = (data) => {
        app.messages.push(data);
        app.refreshMsgBox();
    }

    const updateUsers = (data) => {
        app.users = data;
        if (app.messages.length !== 0) {
            app.refreshMsgBox();
        }
    }

    return {
        newMessage,
        updateUsers
    }
}
