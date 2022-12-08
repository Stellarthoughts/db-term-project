import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';

function Tree() {
	const navigate = useNavigate()

	const nodeIdRoot = "root"
	const nodeIdRegistration = "register"
	const nodeIdLogin = "login"

	const handleOnNodeSelect = (
		event: React.SyntheticEvent,
		nodeId: string
	) => {
		switch (nodeId) {
			case nodeIdRoot:
				navigate("/")
				return
			case nodeIdRegistration:
				navigate("/register")
				return
			case nodeIdLogin:
				navigate("/login")
				return
		}
		navigate("/" + nodeId)
	}

	return (
		<TreeView
			aria-label="entry tree"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			onNodeSelect={handleOnNodeSelect}
			sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
		>
			<TreeItem nodeId={nodeIdRoot} label="Welcome!" />
			<TreeItem nodeId={nodeIdRegistration} label="Sign Up" />
			<TreeItem nodeId={nodeIdLogin} label="Sign In" />

		</TreeView>
	);
}

export default Tree;
