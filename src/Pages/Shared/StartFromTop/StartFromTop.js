import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const StartFromTop = ({ history }) => {
	useEffect(() => {
		const unlisten = history.listen(() => {
			window.scroll(0, 0);
		});
		return () => unlisten();
	}, []);
	return null;
};

export default withRouter(StartFromTop);