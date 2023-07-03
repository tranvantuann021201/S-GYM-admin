// UserScreen.js
import { Table, Button } from 'react-bootstrap';
import "../styles/User.css"
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { handlePreviousPage, handleNextPage } from '../controllers/UserController';

function UserScreen({ user, currentUserPage, setCurrentUserPage, itemsUserPerPage }) {
    const startIndex = (currentUserPage - 1) * itemsUserPerPage;
    const endIndex = startIndex + itemsUserPerPage;
    const currentItems = user.slice(startIndex, endIndex);

    return (
        <div>
            {/* User table */}
            <Table style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>STT</th>
                        <th style={{ textAlign: 'center' }}>Tên</th>
                        <th style={{ textAlign: 'center' }}>Ngày sinh</th>
                        <th style={{ textAlign: 'center' }}>Giới tính</th>
                        <th style={{ textAlign: 'center' }}>Chiều cao</th>
                        <th style={{ textAlign: 'center' }}>Cân nặng</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user, index) => (
                        <tr key={user.id}>
                            <td style={{ textAlign: 'center' }}>{startIndex + index + 1}</td>
                            <td style={{ textAlign: 'center' }}>{user.name}</td>
                            <td style={{ textAlign: 'center' }}>{user.birthDays}</td>
                            <td style={{ textAlign: 'center' }}>{user.gender ? "Nam" : "Nữ"}</td>
                            <td style={{ textAlign: 'center' }}>{user.currentHeight + " cm"}</td>
                            <td style={{ textAlign: 'center' }}>{user.currentWeight + " KG"}</td>

                            <td style={{ textAlign: 'center' }}>
                                <div>
                                    <Button style={{ marginRight: 10 }}>
                                        <FiEdit2 />
                                    </Button>
                                    <Button style={{ backgroundColor: 'red', border: 0 }}>
                                        <FiTrash2 />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Previous page button */}
                <Button
                    disabled={currentUserPage === 1}
                    onClick={() => handlePreviousPage(currentUserPage, setCurrentUserPage)}
                >
                    Trước
                </Button>

                {/* Page number */}
                <div style={{ margin: '0 10px' }}>Trang {currentUserPage}</div>

                {/* Next page button */}
                <Button
                    disabled={endIndex >= user.length}
                    onClick={() => handleNextPage(currentUserPage, setCurrentUserPage, user.length, itemsUserPerPage)}
                >
                    Sau
                </Button>
            </div>
        </div>
    );
}

export default UserScreen;
