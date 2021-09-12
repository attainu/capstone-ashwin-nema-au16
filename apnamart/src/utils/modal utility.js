export const showmodalwithmessageandvariant = (showmodalfunction, modalmessage, messagesetter, modalvariant, variantchanger, messageref) => {
    if (messagesetter !== undefined) {
        messagesetter(modalmessage)
    }

    if (modalvariant !== undefined && variantchanger !== undefined) {
        variantchanger(modalvariant)
    }

    if (messageref !== undefined) {
        messageref.current = modalmessage
    }
    showmodalfunction(true)
}