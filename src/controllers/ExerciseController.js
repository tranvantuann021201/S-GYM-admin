// ExerciseController.js
import { getDatabase, ref, push, set, remove } from "firebase/database";

export function handlePreviousPage(currentPage, setCurrentPage) {
    setCurrentPage(currentPage - 1);
}

export function handleNextPage(currentPage, setCurrentPage, exercisesLength, itemsPerPage) {
    const endIndex = (currentPage - 1) * itemsPerPage + itemsPerPage;
    if (endIndex >= exercisesLength) return;
    setCurrentPage(currentPage + 1);
}

// ExerciseController.js
export function handleAddExercise(setShowModal) {
    setShowModal(true);
}

export function handleCloseModal(setShowModal) {
    setShowModal(false);
}

export function handleSaveExercise(exercises, setExercises, setShowModal) {
    // Lấy dữ liệu từ các trường nhập liệu trên dialog
    const name = document.getElementById("exercise-name").value;
    const description = document.getElementById("exercise-description").value;
    const kcalCaloriesConsumed = parseFloat(document.getElementById("exercise-kcal").value);
    let urlVideoGuide = document.getElementById("exercise-url").value;
    const animationMount = 10
    const complete = false

    urlVideoGuide = urlVideoGuide.replace("?type=mp4", "");

    // Tạo đối tượng exercise mới
    const newExercise = {
        id: exercises.length + 1,
        name,
        description,
        kcalCaloriesConsumed,
        urlVideoGuide,
        animationMount,
        complete
    };

    // Thêm đối tượng exercise mới vào danh sách exercises
    setExercises([...exercises, newExercise]);

    // Đóng dialog
    setShowModal(false);

    // Thêm đối tượng exercise mới vào cơ sở dữ liệu Realtime Database
    const db = getDatabase();
    const newExerciseRef = push(ref(db, 'Exercises'));
    set(newExerciseRef, newExercise);
    // Lấy key của đối tượng mới được tạo ra
    const newExerciseKey = newExerciseRef.key;

    // Cập nhật đối tượng exercise mới trong danh sách exercises
    setExercises([...exercises, { ...newExercise, key: newExerciseKey }]);
}

export function handleEditExercise(exercise, setCurrentExercise, setShowEditModal) {
    setCurrentExercise(exercise);
    setShowEditModal(true);
}

export function handleCloseEditModal(setCurrentExercise, setShowEditModal) {
    setCurrentExercise(null);
    setShowEditModal(false);
}

export function handleSaveEditedExercise(currentExercise, exercises, setExercises, setCurrentExercise, setShowEditModal) {
    // Lấy dữ liệu từ các trường nhập liệu trên dialog
    const name = document.getElementById("edit-exercise-name").value;
    const description = document.getElementById("edit-exercise-description").value;
    const kcalCaloriesConsumed = parseFloat(document.getElementById("edit-exercise-kcal").value);
    let urlVideoGuide = document.getElementById("edit-exercise-url").value;
    const animationMount = currentExercise.animationMount
    const complete = currentExercise.complete
    const id = currentExercise.id

    urlVideoGuide = urlVideoGuide.replace("?type=mp4", "");

    // Cập nhật đối tượng exercise hiện tại trong danh sách exercises
    setExercises(exercises.map((exercise) => {
        if (exercise.id === currentExercise.id) {
            return {
                ...exercise,
                name,
                description,
                id,
                kcalCaloriesConsumed,
                urlVideoGuide,
                animationMount,
                complete
            };
        }
        return exercise;
    }));

    // Đóng dialog
    setCurrentExercise(null);
    setShowEditModal(false);

    // Cập nhật đối tượng exercise đã chỉnh sửa lên cơ sở dữ liệu Realtime Database
    const db = getDatabase();
    set(ref(db, 'Exercises/' + currentExercise.key), {
        name,
        description,
        kcalCaloriesConsumed,
        id,
        urlVideoGuide,
        animationMount,
        complete
    });
}

export function handleDeleteExercise(currentExercise, exercises, setExercises) {
    // Xóa đối tượng exercise được chọn khỏi danh sách exercises
    setExercises(exercises.filter((ex) => ex.id !== currentExercise.id));

    // Xóa đối tượng exercise được chọn khỏi cơ sở dữ liệu Realtime Database
    const db = getDatabase();
    remove(ref(db, 'Exercises/' + currentExercise.key)).catch((error) => {
        console.log(error);
    });
}






