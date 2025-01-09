using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.EfCore.Migrations
{
    /// <inheritdoc />
    public partial class AddUserAccountData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address_Apartment",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Building",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_City",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Street",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonalData_FullName",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonalData_Phone",
                table: "AspNetUsers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_Apartment",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Address_Building",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Address_City",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Address_Street",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PersonalData_FullName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PersonalData_Phone",
                table: "AspNetUsers");
        }
    }
}
