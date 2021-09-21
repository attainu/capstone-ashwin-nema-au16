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

export const modalstatesetter = (message,variant, configuration) => {
    const newconfiguration = [...configuration]
    newconfiguration[1] = message
    newconfiguration[3] = variant
    showmodalwithmessageandvariant(...newconfiguration)
}