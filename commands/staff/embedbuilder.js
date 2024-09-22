const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create a custom embed"),
  async run(client, interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      await interaction.reply({
        content:
          "You do not have the required permissions to use this command.",
        ephemeral: true,
      });
      return;
    }

    const modal = new ModalBuilder()
      .setCustomId("embedModal")
      .setTitle("Create Embed");

    const titleInput = new TextInputBuilder()
      .setCustomId("title")
      .setLabel("Embed Title")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Embed Description")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const colorInput = new TextInputBuilder()
      .setCustomId("color")
      .setLabel("Embed Color (hex)")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const thumbnailInput = new TextInputBuilder()
      .setCustomId("thumbnail")
      .setLabel("Embed Thumbnail URL (optional)")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const bannerInput = new TextInputBuilder()
      .setCustomId("banner")
      .setLabel("Embed Banner URL (optional)")
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    modal.addComponents(
      new ActionRowBuilder().addComponents(titleInput),
      new ActionRowBuilder().addComponents(descriptionInput),
      new ActionRowBuilder().addComponents(colorInput),
      new ActionRowBuilder().addComponents(thumbnailInput),
      new ActionRowBuilder().addComponents(bannerInput)
    );

    await interaction.showModal(modal);

    const filter = (modalInteraction) =>
      modalInteraction.customId === "embedModal" &&
      modalInteraction.user.id === interaction.user.id;

    interaction
      .awaitModalSubmit({ filter, time: 60000 })
      .then(async (modalInteraction) => {
        const title = modalInteraction.fields.getTextInputValue("title");
        const description =
          modalInteraction.fields.getTextInputValue("description");
        const color = modalInteraction.fields.getTextInputValue("color");
        const thumbnail = modalInteraction.fields
          .getTextInputValue("thumbnail")
          .trim();
        const banner = modalInteraction.fields
          .getTextInputValue("banner")
          .trim();

        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(description)
          .setColor(color)
          .setTimestamp();

        if (thumbnail) {
          embed.setThumbnail(thumbnail);
        }

        if (banner) {
          embed.setImage(banner);
        }

        await modalInteraction.reply({ embeds: [embed] });
      })
      .catch(console.error);
  },
};
