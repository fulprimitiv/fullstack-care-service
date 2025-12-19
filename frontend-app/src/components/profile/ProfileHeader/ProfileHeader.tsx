import React from 'react';
import './ProfileHeader.scss';

interface Props {
	name: string | undefined;
	initials: string;
}

export const ProfileHeader: React.FC<Props> = ({ name, initials }) => (
	<div className="profile-header">
		<div className="profile-header__avatar">{initials}</div>
		<div className="profile-header__name">{name}</div>
	</div>
);
