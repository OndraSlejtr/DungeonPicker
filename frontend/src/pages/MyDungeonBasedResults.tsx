import { bestDungeonsPicksBracket, worstDungeonsPicksBracket } from "../data/brackets";
import { best, worst } from "../data/result";
import { timings } from "../utils/timing";
import DungeonBasedResults from "./DungeonBasedResults/DungeonBasedResults";

const MyDungeonBasedResults = () => {
    if (!timings.results.isFulfilled()) {
        return <h1>Results are not available yet.</h1>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <DungeonBasedResults listType="best" bracketData={bestDungeonsPicksBracket} scores={best} />
            <DungeonBasedResults listType="worst" bracketData={worstDungeonsPicksBracket} scores={worst} />
        </div>
    );
};

export default MyDungeonBasedResults;
