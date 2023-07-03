/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
// ExerciseScreen.js
import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, FormGroup, Container, Row, Col, NavLink } from "react-bootstrap"
import "../styles/Exercises.css"
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { handleAddExercise, handleCloseModal, handleSaveExercise, handleEditExercise, handleCloseEditModal, handleSaveEditedExercise, handleDeleteExercise } from '../controllers/ExerciseController';


function ExerciseScreen({ exercises, originalExercises, setExercises, currentPage, setCurrentPage, itemsPerPage }) {
    const [showModal, setShowModal] = useState(false);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = exercises.slice(startIndex, endIndex);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const handleOpenDeleteModal = (exercise) => {
        setCurrentExercise(exercise);
        setShowRemoveModal(true);
    }
    const handleCloseDeleteModal = () => {
        setCurrentExercise(null);
        setShowRemoveModal(false);
    }

    // Thêm trạng thái searchText để theo dõi giá trị nhập vào ô tìm kiếm
    const [searchText, setSearchText] = useState("");

    // Thêm trạng thái hasSearched để theo dõi liệu người dùng đã thực hiện tìm kiếm hay chưa
    const [hasSearched, setHasSearched] = useState(false);

    // Thêm hàm handleSearch để xử lý việc tìm kiếm
    const handleSearch = () => {
        // Lọc các bài tập dựa trên thuộc tính name
        const filteredExercises = originalExercises.filter((exercise) =>
            exercise.name.includes(searchText)
        );
        // Cập nhật trạng thái exercises với các bài tập được lọc
        setExercises(filteredExercises);
        // Đặt lại trang hiện tại về 1
        setCurrentPage(1);
        // Cập nhật trạng thái hasSearched thành true
        setHasSearched(true);
    };

    // Thêm hàm handleBackToExerciseList để xử lý việc trở về danh sách ban đầu
    const handleBackToExerciseList = () => {
        // Đặt lại giá trị của exercises về giá trị ban đầu
        setExercises(originalExercises);
        // Đặt lại trang hiện tại về 1
        setCurrentPage(1);
        // Cập nhật trạng thái hasSearched thành false
        setHasSearched(false);
        setSearchText("")
    };

    return (
        <div>
            {/* Add exercise button */}
            <div>
                <Form className="d-flex" style={{ margin: 10 }}>
                    <Col>
                        <Button onClick={() => handleAddExercise(setShowModal)}>Thêm động tác</Button>
                    </Col>

                    <Col>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchText}
                            // Cập nhật giá trị searchText khi người dùng nhập vào ô tìm kiếm
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col style={{ marginLeft: 10 }}>
                        <Button onClick={handleSearch}>Tìm kiếm</Button>
                    </Col>
                    <Col>
                        {/* Chỉ hiển thị nút "Trở về danh sách động tác" khi người dùng đã thực hiện tìm kiếm */}
                        {hasSearched && (
                            // Gọi hàm handleBackToExerciseList khi người dùng nhấn nút "Trở về danh sách động tác"
                            <Button onClick={handleBackToExerciseList}>Trở về danh sách động tác</Button>
                        )}
                    </Col>
                </Form>
            </div>

            {/* Exercise table */}
            <Table >
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>STT</th>
                        <th style={{ textAlign: "center" }}>Tên động tác</th>
                        <th style={{ textAlign: "center" }}>Mô tả</th>
                        <th style={{ textAlign: "center" }}>Calo tiêu thụ </th>
                        <th style={{ textAlign: "center" }}>Video hướng dẫn</th>
                        <th style={{ textAlign: "center" }}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((exercise, index) => (
                        <tr key={exercise.id}>
                            <td className="detail">{startIndex + index + 1}</td>
                            <td className="name-column">{exercise.name}</td>
                            <td className="description-column">{exercise.description}</td>
                            <td className="detail" style={{ width: 150 }}>{exercise.kcalCaloriesConsumed}</td>
                            <td>
                                <img
                                    src={exercise.urlVideoGuide}
                                    alt="Video Guide Image"
                                    className="video-guide-column"
                                />
                            </td>
                            <td className="detail">
                                <div>
                                    <Button className="edit-button" onClick={() => handleEditExercise(exercise, setCurrentExercise, setShowEditModal)}>
                                        <FiEdit2 />
                                    </Button>
                                </div>
                                <div>
                                    <Button className="delete-button" onClick={() => handleOpenDeleteModal(exercise)}>
                                        <FiTrash2 />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Previous page button */}
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Trước
                </Button>

                {/* Page number */}
                <div style={{ margin: '0 10px' }}>Trang {currentPage}</div>

                {/* Next page button */}
                <Button
                    disabled={endIndex >= exercises.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Sau
                </Button>
            </div>

            {/* Add exercise modal */}
            <Modal show={showModal} onHide={() => handleCloseModal(setShowModal)}>
                <Modal.Header >
                    <Modal.Title closeButton>Thêm động tác</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <Form.Label>Tên động tác</Form.Label>
                            <Form.Control type="text" id="exercise-name" />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea" rows={3} id="exercise-description" />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Calo tiêu thụ</Form.Label>
                            <Form.Control type="number" id="exercise-kcal" />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>URL Video hướng dẫn</Form.Label>
                            <Form.Control type="text" id="exercise-url" />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal(setShowModal)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveExercise(exercises, setExercises, setShowModal)}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={() => handleCloseEditModal(setCurrentExercise, setShowEditModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sửa động tác</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <Form.Label>Tên động tác</Form.Label>
                            <Form.Control type="text" id="edit-exercise-name" defaultValue={currentExercise?.name} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control type="text" id="edit-exercise-description" defaultValue={currentExercise?.description} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Calo tiêu thụ</Form.Label>
                            <Form.Control type="number" id="edit-exercise-kcal" defaultValue={currentExercise?.kcalCaloriesConsumed} />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>URL Video hướng dẫn</Form.Label>
                            <Form.Control type="text" id="edit-exercise-url" defaultValue={currentExercise?.urlVideoGuide} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseEditModal(setCurrentExercise, setShowEditModal)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveEditedExercise(currentExercise, exercises, setExercises, setCurrentExercise, setShowEditModal)}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showRemoveModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa động tác này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handleDeleteExercise(currentExercise, exercises, setExercises);
                        console.log(currentExercise.key);
                        handleCloseDeleteModal();
                    }}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default ExerciseScreen;
