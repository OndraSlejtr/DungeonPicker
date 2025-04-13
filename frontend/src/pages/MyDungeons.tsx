import DungeonPicker from "./DungeonPicker/DungeonPicker";

const MyDungeons = () => {
    return (
        <>
            {/* <h1>{props.listType === "best" ? "Pick best 8 dungeons" : "Pick worst 8 dungeons"}</h1> */}
            <DungeonPicker listType="best" />
            <DungeonPicker listType="worst" />
        </>
    );
};

export default MyDungeons;
