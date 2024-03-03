import { css } from "lit";

export const style = css`
    .app {
        display: flex;
        flex-direction: column;
        justify-content: space-between; 
    }

    .flex {
        display: flex;
    }

    .flex-wrap {
        flex-wrap: wrap;
    }

    .self-end {
        align-self: flex-end;
    }

    .container {
        margin: 24px;
        display: flex;
        flex-direction: column;
    }

    .w-full {
        width: 100%;
    }
    
    .mb-2 {
        margin-bottom: 2rem;
    }
`;
