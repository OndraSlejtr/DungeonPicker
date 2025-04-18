import React from "react";
import { Dungeon } from "../../../data/dungeons";
import DungeonsList from "../../../components/dungeon/DungeonsList";
import DungeonItem from "../../../components/dungeon/DungeonItem";
import styles from "../DungeonVoter.module.css"; // Use parent's CSS module

interface VotingPanelProps {
    dungeonList: Dungeon[];
    onClick: () => void;
    disabled: boolean;
    isWinner?: boolean; // Optional: to style the winning panel
    sameCount?: number;
}

const VotingPanel: React.FC<VotingPanelProps> = ({ dungeonList, onClick, disabled, isWinner, sameCount }) => {
    const renderDungeonItem = (dungeon: Dungeon, identical?: boolean) => (
        <DungeonItem
            key={dungeon.id}
            dungeon={dungeon}
            interactive={false} // Items themselves are not clickable here
            identical={identical}
        />
    );

    const panelClasses = [
        styles.votingPanel,
        disabled && styles.disabled,
        isWinner && styles.winner,
        isWinner === false && styles.loser,
    ].join(" ");

    return (
        <div className={panelClasses} onClick={!disabled ? onClick : undefined}>
            <DungeonsList dungeons={dungeonList} renderItem={renderDungeonItem} sameCount={sameCount} />
        </div>
    );
};

export default VotingPanel;
