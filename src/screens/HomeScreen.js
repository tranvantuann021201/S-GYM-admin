// HomeScreen.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import database from "../firebase"
import { Tabs, Tab, Button, Container, Row, Col, Form } from "react-bootstrap"
import ExerciseScreen from '../screens/ExercisesScreen';
import User from "./UserScreen"; // Import User component

function HomeScreen() {
    const [exercises, setExercises] = useState([]);
    // Thêm trạng thái originalExercises để lưu trữ danh sách ban đầu
    const [originalExercises, setOriginalExercises] = useState([]);
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const itemsUserPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(getDatabase());
            const exerciseSnapshot = await get(child(dbRef, "Exercises"));
            if (exerciseSnapshot.exists()) {
                // Cập nhật giá trị của originalExercises với dữ liệu từ cơ sở dữ liệu
                setOriginalExercises(
                    Object.entries(exerciseSnapshot.val()).map(([key, data]) => ({
                        ...data,
                        key,
                    }))
                );

                setExercises(
                    Object.entries(exerciseSnapshot.val()).map(([key, data]) => ({
                        ...data,
                        key,
                    }))
                );

                console.log(exerciseSnapshot.val());
            } else {
                console.log("No exercise data available");
            }

            // Fetch user data
            const userSnapshot = await get(child(dbRef, "User"));
            if (userSnapshot.exists()) {
                setUser(
                    Object.values(userSnapshot.val()).map((data) => ({
                        ...data,
                    }))
                );
                console.log(userSnapshot.val());
            } else {
                console.log("No user data available");
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ paddingRight: 50, paddingLeft: 50 }}>
            <div style={{ marginTop: 10, height: "100%", width: "100%" }}>
                <Tabs defaultActiveKey="exercises" id="home-tabs">
                    <Tab eventKey="exercises" title="Exercises">
                        <Tab.Content style={{ minHeight: "740px" }}>
                            {/* Render Exercise component */}
                            {/* Truyền originalExercises xuống component ExerciseScreen thay vì exercises */}
                            <ExerciseScreen
                                originalExercises={originalExercises}
                                exercises={exercises}
                                setExercises={setExercises}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsPerPage={itemsPerPage}
                            />
                        </Tab.Content>
                    </Tab>

                    {/* New tab for user */}
                    <Tab eventKey="user" title="User">
                        <Tab.Content style={{ minHeight: "740px" }}>
                            {/* Render User component */}
                            <Button style={{ margin: 10 }}>Thêm người dùng</Button>
                            <User
                                user={user}
                                currentUserPage={currentUserPage}
                                setCurrentUserPage={setCurrentUserPage}
                                itemsUserPerPage={itemsUserPerPage}
                            />
                        </Tab.Content>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default HomeScreen;
