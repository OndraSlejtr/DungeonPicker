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
    isLoser?: boolean; // Optional: to style the losing panel
}

const VotingPanel: React.FC<VotingPanelProps> = ({ dungeonList, onClick, disabled, isWinner, isLoser }) => {
    const renderDungeonItem = (dungeon: Dungeon) => (
        <DungeonItem
            key={dungeon.id}
            dungeon={dungeon}
            interactive={false} // Items themselves are not clickable here
        />
    );

    const panelClasses = [
        styles.votingPanel,
        disabled ? styles.disabled : "",
        isWinner ? styles.winner : "",
        isLoser ? styles.loser : "",
    ].join(" ");

    return (
        <div className={panelClasses} onClick={!disabled ? onClick : undefined}>
            <DungeonsList dungeons={dungeonList} renderItem={renderDungeonItem} />
            {!disabled && <div className={styles.clickIndicator}>Click to Vote</div>}
        </div>
    );
};

export default VotingPanel;
