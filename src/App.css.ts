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
        margin-left: 1rem;
        margin-right: 1rem;
        display: flex;
        flex-direction: column;
    }

    .help-text {
        color: var(--spectrum-global-color-gray-600);
    }

    .w-full {
        width: 100%;
    }
    
    .mb-1 {
        margin-bottom: 1rem;
    }

    .mb-2 {
        margin-bottom: 2rem;
    }
`;
