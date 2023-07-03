export function login(username, password) {
    // User Login info
    const database = [
        {
            username: "admin",
            password: "admin"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    // Find user login info
    const userData = database.find((user) => user.username === username);

    // Compare user info
    if (userData) {
        if (userData.password !== password) {
            // Invalid password
            return { success: false, error: "Sai thông tin tài khoản hoặc mật khẩu  " };
        } else {
            return { success: true };
        }
    } else {
        // Username not found
        return { success: false, error: "Tài khoản không tồn tại" };
    }
}
