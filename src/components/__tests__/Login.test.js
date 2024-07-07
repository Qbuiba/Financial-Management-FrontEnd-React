import { render, screen } from '@testing-library/react';
import Login from "../Login";
import {MemoryRouter} from "react-router-dom";

test('Test render Login page', async() => {

    const {asFragment} = render(
        <MemoryRouter>
            <Login  onLogin={()=>{}} />
        </MemoryRouter>
    );

    await screen.findByLabelText('Username');

    expect(asFragment()).toMatchSnapshot();
});
