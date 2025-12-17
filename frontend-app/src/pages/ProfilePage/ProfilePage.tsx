import React from 'react';
import { ProfileHeader } from '../../components/profile/ProfileHeader/ProfileHeader';
import { ProfileInfo } from '../../components/profile/ProfileMain/ProfileInfo';
import { ProfileStats } from '../../components/profile/ProfileMain/ProfileStats';
import './ProfilePage.scss';
import { ProfileButtons } from '../../components/profile/ProfileButtons/ProfileButtons';

export const ProfilePage: React.FC = () => {
	return (
		<div className="profile-page">
			<ProfileHeader name="Иван Иванов" initials="ИИ" />

			<div className="profile-page__container">
				<ProfileInfo
					phone="+7 (999) 123-45-67"
					address="ул. Ленина, д.   15, кв. 42"
					birthDate="15.03.1950"
					email="ivanov@example.com"
				/>

				<ProfileStats
					completed={12}
					active={2}
					since="января 2024"
					rating={4.9}
				/>
			</div>

			<ProfileButtons />
		</div>
	);
};
