// UserController.js
export function handlePreviousPage(currentUserPage, setCurrentUserPage) {
    setCurrentUserPage(currentUserPage - 1);
}

export function handleNextPage(currentUserPage, setCurrentUserPage, userLength, itemsUserPerPage) {
    const endIndex = (currentUserPage - 1) * itemsUserPerPage + itemsUserPerPage;
    if (endIndex >= userLength) return;
    setCurrentUserPage(currentUserPage + 1);
}
