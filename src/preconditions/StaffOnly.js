const { Precondition } = require('@sapphire/framework');

class StaffOnlyPrecondition extends Precondition {
    async chatInputRun(interaction) {
        return this.checkIsStaff(interaction);
    }

    async checkIsStaff(interaction) {
        const isStaff = interaction.member.roles.cache.some(role => role.name === 'Staff');
        if (isStaff) return this.ok();
        return this.error({ message: 'You have to be staff to use this command.', context: { silent: true } });
    }
}

module.exports = StaffOnlyPrecondition;