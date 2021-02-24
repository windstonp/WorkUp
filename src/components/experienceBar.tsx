import React from 'react';
export function ExperienceBar(){
    return(
        <header className="experience-bar">
            <span>
                0 xp
            </span>
            <div>
                <div style={{ width:'50%' }} />
                <span style={{ left:'50%' }}>current experience 300</span>
            </div>
            <span>
                600xp
            </span>
        </header>
    );
}