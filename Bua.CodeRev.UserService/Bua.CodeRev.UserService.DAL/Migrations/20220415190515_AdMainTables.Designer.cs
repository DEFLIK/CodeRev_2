﻿// <auto-generated />
using System;
using Bua.CodeRev.UserService.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Bua.CodeRev.UserService.DAL.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220415190515_AdMainTables")]
    partial class AdMainTables
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Bua.CodeRev.UserService.DAL.Entities.Interview", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("InterviewText")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Interviews");
                });

            modelBuilder.Entity("Bua.CodeRev.UserService.DAL.Entities.InterviewSolution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<long>("EndTimeMillis")
                        .HasColumnType("bigint");

                    b.Property<Guid>("InterviewId")
                        .HasColumnType("uuid");

                    b.Property<int>("InterviewResult")
                        .HasColumnType("integer");

                    b.Property<string>("ReviewerComment")
                        .HasColumnType("text");

                    b.Property<long>("StartTimeMillis")
                        .HasColumnType("bigint");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("InterviewSolutions");
                });

            modelBuilder.Entity("Bua.CodeRev.UserService.DAL.Entities.InterviewTask", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("InterviewId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("InterviewTasks");
                });

            modelBuilder.Entity("Bua.CodeRev.UserService.DAL.Entities.Task", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("TaskText")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("Bua.CodeRev.UserService.DAL.Entities.TaskSolution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("InterviewSolutionId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDone")
                        .HasColumnType("boolean");

                    b.Property<Guid>("RunTimelineId")
                        .HasColumnType("uuid");

                    b.Property<int>("TaskGrade")
                        .HasColumnType("integer");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("TimelineId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.ToTable("TaskSolutions");
                });

            modelBuilder.Entity("Bua.CodeRev.UserService.DAL.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}